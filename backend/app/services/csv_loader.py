from io import BytesIO

import pandas as pd
from fastapi import UploadFile


async def read_csv_upload(file: UploadFile | None) -> pd.DataFrame | None:
    if file is None:
        return None

    contents = await file.read()

    if not contents:
        raise ValueError(f"{file.filename} is empty.")

    try:
        dataframe = pd.read_csv(BytesIO(contents))
    except Exception as exc:
        raise ValueError(f"Could not parse {file.filename} as CSV: {exc}") from exc

    if dataframe.empty:
        raise ValueError(f"{file.filename} contains no rows.")

    return dataframe
