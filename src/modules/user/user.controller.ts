import { Body, POST, Response } from "@decorators";
import express from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import UserService from "./user.service";

export default class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  @POST("createUser")
  async getUser(
    @Response() response: express.Response,
    @Body() body: CreateUserDto
  ) {
    const user = await this.userService.createUser(body);

    response.json(user);
  }
}
