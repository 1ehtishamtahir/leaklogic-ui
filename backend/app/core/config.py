from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"

    fireworks_api_key: str | None = None
    fireworks_api_base_url: str = "https://api.fireworks.ai/inference/v1"
    fireworks_model: str | None = None
    enable_llm_narrative: bool = False

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
