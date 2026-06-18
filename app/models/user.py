from datetime import datetime, UTC
from enum import Enum
from typing import Optional

from beanie import Document
from pydantic import BaseModel, EmailStr, Field
from pymongo import IndexModel, ASCENDING  # <-- Importamos as ferramentas de índice do pymongo

class ListStatus(str, Enum):
    read = "read"
    watched = "watched"
    dropped = "dropped"

class UserListItem(BaseModel):
    item_id: str
    title: str = Field(min_length=1, max_length=255)
    media_type: str = Field(min_length=1, max_length=50)
    status: ListStatus
    added_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

class User(Document):
    name: str
    username: str  # <-- Voltaram a ser tipos normais
    email: EmailStr  # <-- Voltaram a ser tipos normais
    hashed_password: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    is_active: bool = True
    is_verified: bool = False
    is_private: bool = False
    list_items: list[UserListItem] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))

    class Settings:
        name = "users"
        # Declaramos as regras de unicidade diretamente no banco de dados, do jeito mais seguro!
        indexes = [
            IndexModel([("username", ASCENDING)], unique=True),
            IndexModel([("email", ASCENDING)], unique=True)
        ]