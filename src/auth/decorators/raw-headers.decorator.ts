import { createParamDecorator, InternalServerErrorException } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export const RawHeaders = createParamDecorator((data: string, ctx: ExecutionContextHost)=>{
  const req = ctx.switchToHttp().getRequest();
  return req.rawHeaders
});