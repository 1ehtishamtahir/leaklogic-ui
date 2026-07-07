@echo off
echo Starting Profit Leak Hunter Backend...
echo.

cd backend

if not exist .venv (
    echo Creating virtual environment...
    python -m venv .venv
)

echo Activating virtual environment...
call .venv\Scripts\activate.bat

echo Installing/updating dependencies...
pip install -q -r requirements.txt

echo.
echo Starting backend server on http://127.0.0.1:8000
echo Press Ctrl+C to stop
echo.

python -m uvicorn app.main:app --reload
