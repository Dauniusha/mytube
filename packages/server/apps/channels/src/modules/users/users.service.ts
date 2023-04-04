import { Injectable } from "@nestjs/common";
import { CreateChannelUserDto, DeleteChannelUserDto } from "@mytube/shared/channels/models/users";
import { UsersRepository } from "../core/repositories/users.repository";

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {}

    async createUser(data: CreateChannelUserDto) {
        await this.usersRepository.createUser(data);
    }

    async deleteUser(data: DeleteChannelUserDto) {
        await this.usersRepository.deleteUser(data.userId);
    } 
}
