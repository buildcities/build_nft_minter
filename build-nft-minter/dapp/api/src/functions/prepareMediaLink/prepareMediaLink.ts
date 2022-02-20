import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
import * as cloudinary from 'cloudinary'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  const params = event.path.split('/')
  const format = params[2]
  const type = params[3]
  const url =
    format == 'video'
      ? cloudinary.v2.url(`nft/${type}`, {
          resource_type: 'video',
          loop: true,
        })
      : cloudinary.v2.url(`nft/${type}`, {
          quality: 'auto',
          fetch_format: 'auto',
        })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  }
}
