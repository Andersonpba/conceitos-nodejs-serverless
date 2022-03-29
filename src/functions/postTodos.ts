import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import { v4 as uuid } from "uuid";

interface ICreateTodo {
  title: string;
  deadline: Date;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const id = uuid();
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo

  await document.put({
    TableName: "users_todo",
    Item: {
      id,
      user_id,
      title,
      done: false,
      deadline,
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo Criado com sucesso",
    })
  }
}