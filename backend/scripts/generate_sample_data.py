"""
Generate expanded sample data for refunds, suppliers, and inventory
that aligns with the existing sales.csv data.
"""
import pandas as pd
import random
from pathlib import Path
from datetime import datetime, timedelta


# Set random seed for reproducibility
random.seed(42)

# Load existing sales data
SAMPLE_DATA_DIR = Path(__file__).parent.parent / "app" / "sample_data"
sales_df = pd.read_csv(SAMPLE_DATA_DIR / "sales.csv")

# Parse dates
sales_df['date'] = pd.to_datetime(sales_df['date'])

# Get unique products and SKUs from sales
products = sales_df[['product', 'sku']].drop_duplicates()
product_categories = products['product'].unique()


def generate_refunds():
    """Generate ~180 refund records based on sales data"""
    print("Generating refunds data...")
    
    refunds = []
    
    # Define refund reasons and their probabilities
    reasons = {
        "Damaged": 0.30,
        "Quality issue": 0.25,
        "Changed mind": 0.20,
        "Not as described": 0.15,
        "Defective": 0.10,
    }
    
    # Category-specific refund rate patterns (INCREASED FOR DRAMATIC DEMO)
    category_refund_rates = {
        "Health and beauty": {
            "early": 0.05,  # 5% early period
            "recent": 0.25,  # 25% recent (increased - leak!)
            "reasons": ["Allergic reaction", "Product defect", "Not effective", "Quality issue"]
        },
        "Electronic accessories": {
            "early": 0.06,
            "recent": 0.18,  # Increased from 0.07
            "reasons": ["Defective", "Damaged", "Not compatible", "Changed mind"]
        },
        "Home and lifestyle": {
            "early": 0.07,
            "recent": 0.08,
            "reasons": ["Damaged", "Quality issue", "Changed mind", "Not as described"]
        },
        "Sports and travel": {
            "early": 0.04,
            "recent": 0.05,
            "reasons": ["Damaged", "Wrong size", "Changed mind", "Quality issue"]
        },
        "Food and beverages": {
            "early": 0.04,
            "recent": 0.05,
            "reasons": ["Quality issue", "Expired", "Changed mind", "Damaged"]
        },
        "Fashion accessories": {
            "early": 0.09,
            "recent": 0.22,  # Increased from 0.11
            "reasons": ["Wrong size", "Changed mind", "Quality issue", "Damaged"]
        },
    }
    
    # Calculate date midpoint
    min_date = sales_df['date'].min()
    max_date = sales_df['date'].max()
    midpoint = min_date + (max_date - min_date) / 2
    
    # Generate refunds by category
    for category in product_categories:
        category_sales = sales_df[sales_df['product'] == category]
        config = category_refund_rates.get(category, {"early": 0.06, "recent": 0.07, "reasons": list(reasons.keys())})
        
        # Early period refunds
        early_sales = category_sales[category_sales['date'] <= midpoint]
        early_refund_count = int(len(early_sales) * config["early"])
        early_sample = early_sales.sample(n=min(early_refund_count, len(early_sales)))
        
        for _, row in early_sample.iterrows():
            refund_percentage = random.uniform(0.6, 0.95)  # 60-95% of revenue refunded (more dramatic)
            refunds.append({
                'date': row['date'] + timedelta(days=random.randint(1, 14)),
                'order_id': row['order_id'],
                'product': row['product'],
                'sku': row['sku'],
                'refund_amount': round(row['revenue'] * refund_percentage, 2),
                'reason': random.choice(config["reasons"])
            })
        
        # Recent period refunds (higher rate)
        recent_sales = category_sales[category_sales['date'] > midpoint]
        recent_refund_count = int(len(recent_sales) * config["recent"])
        recent_sample = recent_sales.sample(n=min(recent_refund_count, len(recent_sales)))
        
        for _, row in recent_sample.iterrows():
            refund_percentage = random.uniform(0.7, 1.0)  # 70-100% refunded (dramatic leak)
            refunds.append({
                'date': row['date'] + timedelta(days=random.randint(1, 14)),
                'order_id': row['order_id'],
                'product': row['product'],
                'sku': row['sku'],
                'refund_amount': round(row['revenue'] * refund_percentage, 2),
                'reason': random.choice(config["reasons"])
            })
    
    refunds_df = pd.DataFrame(refunds)
    refunds_df = refunds_df.sort_values('date').reset_index(drop=True)
    
    print(f"Generated {len(refunds_df)} refund records")
    return refunds_df


def generate_suppliers():
    """Generate ~250 supplier records with cost increase patterns"""
    print("Generating suppliers data...")
    
    suppliers = []
    
    # Define suppliers per category
    supplier_mapping = {
        "Health and beauty": "BeautySupplyCo",
        "Electronic accessories": "TechWholesale Inc",
        "Home and lifestyle": "HomeGoods Ltd",
        "Sports and travel": "ActiveLife Supplies",
        "Food and beverages": "FreshDistributors",
        "Fashion accessories": "StyleSource Co",
    }
    
    # Get top SKUs per category
    top_skus_per_category = (
        sales_df.groupby(['product', 'sku'])
        .size()
        .reset_index(name='count')
        .sort_values(['product', 'count'], ascending=[True, False])
        .groupby('product')
        .head(15)  # Top 15 SKUs per category
    )
    
    # Generate weekly supplier records for Q1 2019
    start_date = datetime(2019, 1, 1)
    end_date = datetime(2019, 3, 31)
    current_date = start_date
    
    weeks = []
    while current_date <= end_date:
        weeks.append(current_date)
        current_date += timedelta(days=7)
    
    for _, row in top_skus_per_category.iterrows():
        category = row['product']
        sku = row['sku']
        supplier = supplier_mapping.get(category, "Generic Supplier")
        
        # Get average unit price from sales to derive realistic cost
        avg_price = sales_df[sales_df['sku'] == sku]['unit_price'].mean()
        
        # Base cost is ~45-55% of selling price
        base_cost = avg_price * random.uniform(0.45, 0.55)
        
        # Cost increase pattern (some products have cost creep)
        cost_increase_rate = random.uniform(0.05, 0.45)  # 5% to 45% over period (more dramatic)
        
        for i, week_date in enumerate(weeks):
            # Progressive cost increase
            progress = i / len(weeks)
            current_cost = base_cost * (1 + (cost_increase_rate * progress))
            
            # Add some random variation
            current_cost = current_cost * random.uniform(0.97, 1.03)
            
            # Purchase volume varies
            purchase_volume = random.randint(50, 400)
            
            suppliers.append({
                'date': week_date,
                'supplier_name': supplier,
                'product': category,
                'sku': sku,
                'unit_cost': round(current_cost, 2),
                'purchase_volume': purchase_volume
            })
    
    suppliers_df = pd.DataFrame(suppliers)
    suppliers_df = suppliers_df.sort_values(['date', 'product']).reset_index(drop=True)
    
    print(f"Generated {len(suppliers_df)} supplier records")
    return suppliers_df


def generate_inventory():
    """Generate ~200 inventory snapshot records"""
    print("Generating inventory data...")
    
    inventory = []
    
    # Get top SKUs
    top_skus = (
        sales_df.groupby(['product', 'sku'])
        .size()
        .reset_index(name='count')
        .sort_values('count', ascending=False)
        .head(50)  # Top 50 SKUs
    )
    
    # Generate bi-weekly snapshots
    start_date = datetime(2019, 1, 1)
    end_date = datetime(2019, 3, 31)
    current_date = start_date
    
    snapshot_dates = []
    while current_date <= end_date:
        snapshot_dates.append(current_date)
        current_date += timedelta(days=14)  # Bi-weekly
    
    for _, row in top_skus.iterrows():
        category = row['product']
        sku = row['sku']
        
        # Get average selling price
        avg_price = sales_df[sales_df['sku'] == sku]['unit_price'].mean()
        unit_cost = avg_price * random.uniform(0.45, 0.55)
        
        # Initial stock level (INCREASED for more dramatic inventory leak)
        base_stock = random.randint(500, 8000)  # Much higher stock levels
        
        # Determine if this is slow-moving or fast-moving
        is_slow_moving = random.random() < 0.45  # 45% are slow-moving (leak!)
        
        for i, snapshot_date in enumerate(snapshot_dates):
            if is_slow_moving:
                # Slow-moving: stock decreases minimally or even increases
                if i == 0:
                    stock_level = base_stock
                else:
                    change = random.randint(-100, 300)  # More likely to increase (ties up more cash)
                    stock_level = max(200, stock_level + change)
            else:
                # Fast-moving: stock decreases then replenishes
                if i == 0:
                    stock_level = base_stock
                else:
                    # Natural fluctuation with turnover
                    change = random.randint(-300, 200)
                    stock_level = max(50, stock_level + change)
            
            inventory.append({
                'date': snapshot_date,
                'sku': sku,
                'product': category,
                'stock_level': stock_level,
                'unit_cost': round(unit_cost, 2)
            })
    
    inventory_df = pd.DataFrame(inventory)
    inventory_df = inventory_df.sort_values(['date', 'product']).reset_index(drop=True)
    
    print(f"Generated {len(inventory_df)} inventory records")
    return inventory_df


def main():
    print("=" * 60)
    print("GENERATING EXPANDED SAMPLE DATA")
    print("=" * 60)
    print()
    
    # Generate all datasets
    refunds_df = generate_refunds()
    suppliers_df = generate_suppliers()
    inventory_df = generate_inventory()
    
    # Save to CSV
    print()
    print("Saving files...")
    refunds_df.to_csv(SAMPLE_DATA_DIR / "refunds.csv", index=False)
    suppliers_df.to_csv(SAMPLE_DATA_DIR / "suppliers.csv", index=False)
    inventory_df.to_csv(SAMPLE_DATA_DIR / "inventory.csv", index=False)
    
    print()
    print("=" * 60)
    print("✅ SAMPLE DATA GENERATION COMPLETE!")
    print("=" * 60)
    print()
    print("Summary:")
    print(f"  📊 Refunds:    {len(refunds_df):>4} records")
    print(f"  📊 Suppliers:  {len(suppliers_df):>4} records")
    print(f"  📊 Inventory:  {len(inventory_df):>4} records")
    print()
    print("Data includes embedded profit leaks:")
    print("  - Increased refund rates for Health & beauty")
    print("  - Supplier cost increases across multiple SKUs")
    print("  - Slow-moving inventory tying up cash")
    print()
    print("Files saved to:", SAMPLE_DATA_DIR)
    print()


if __name__ == "__main__":
    main()
