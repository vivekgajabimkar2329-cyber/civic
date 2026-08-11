from typing import Optional
from uuid import UUID
from django.db.models import QuerySet
from modules.users.models import User


class UserRepository:

    @staticmethod
    def get_all() -> QuerySet[User]:
        return User.objects.all().order_by("-created_at")

    @staticmethod
    def get_by_id(user_id: UUID) -> Optional[User]:
        return User.objects.filter(id=user_id).first()

    @staticmethod
    def create(data: dict) -> User:
        return User.objects.create_user(**data)

    @staticmethod
    def update(user: User, data: dict) -> User:
        for attr, value in data.items():
            setattr(user, attr, value)
        user.save()
        return user

    @staticmethod
    def delete(user: User) -> None:
        user.delete()
