from uuid import UUID
from common.exceptions import NotFoundException
from modules.users.models import User
from modules.users.repositories import UserRepository


class UserService:

    def __init__(self):
        self.repository = UserRepository()

    def list_users(self):
        return self.repository.get_all()

    def get_user_by_id(self, user_id: UUID) -> User:
        user = self.repository.get_by_id(user_id)
        if not user:
            raise NotFoundException("User not found.")
        return user

    def create_user(self, data: dict) -> User:
        return self.repository.create(data)

    def update_user(self, user_id: UUID, data: dict) -> User:
        user = self.get_user_by_id(user_id)
        return self.repository.update(user, data)

    def delete_user(self, user_id: UUID) -> None:
        user = self.get_user_by_id(user_id)
        self.repository.delete(user)
