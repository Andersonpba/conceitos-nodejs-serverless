import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document.scan({
    TableName: "users_todo",
    FilterExpression: ":user_id = user_id",
    ExpressionAttributeValues: {
      ":user_id": user_id
    }
  }).promise();

  const userTodo = response.Items;

  if(userTodo) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Todos",
        userTodo
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "User don't have todo"
    })
  }
}