"use strict";

const dotenv = require( "dotenv" );
const Hapi = require( "@hapi/hapi" );

const routes = require( "./routes" );

const createServer = async () => {
  const server = Hapi.server( {
    port: process.env.PORT || 8080,
    host: process.env.HOST || "localhost"
  } );

  server.route( routes );

  return server;
};

const init = async () => {
  dotenv.config();
  const server = await createServer();
  await server.start();
  console.log( "Server running on %s", server.info.uri );
};

process.on( "unhandledRejection", ( err ) => {
  console.log( err );
  process.exit( 1 );
} );

init();