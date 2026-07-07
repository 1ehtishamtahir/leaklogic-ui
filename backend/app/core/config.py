from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"

    llm_provider: str = "openrouter"
    enable_llm_narrative: bool = True

    openrouter_api_key: str | None = Field(
        default=None,
        validation_alias=AliasChoices(
            "NEMOTRON-OPENROUTER_API_KEY",
            "OPENROUTER_API_KEY",
        ),
    )
    openrouter_api_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_model: str = Field(
        default="nvidia/nemotron-3-nano-30b-a3b:free",
        validation_alias="OPENROUTER_MODEL",
    )

    fireworks_api_key: str | None = None
    fireworks_api_base_url: str = "https://api.fireworks.ai/inference/v1"
    fireworks_model: str = "accounts/fireworks/models/gpt-oss-120b"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
