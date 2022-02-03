//is this Typescript?
//this is how you build a dynamodb service client
const  {DynamoDBClient, PutItemCommand}  = require("@aws-sdk/client-dynamodb")
const {marshall} = require("@aws-sdk/util-dynamodb")
debug = require('debug')('incoming')


const createMessage = async (args) => {
    
    const params = {
        TableName: process.env.STARTUP_MESSAGE_TABLE || "",
        Item: marshall({
            content: args,
            createdAt:Date.now().toString()
        })
    }

    console.log(item)
    console.log(data)

    try{
        const client = new DynamoDBClient({region: "us-west-2"})
        const command = new PutItemCommand(params)
        await client.send(command)
        
    } catch(e){
        console.log('errr:' + e)
        debug('Post Error:' + e)
    }
}

module.exports = createMessage

// THIS IS FOR V2 OF THE AWS-SDK FOR JAVASCRIPT
// THIS IS FOR V2 OF THE AWS-SDK FOR JAVASCRIPT
// THIS IS FOR V2 OF THE AWS-SDK FOR JAVASCRIPT

//import an aws service client for dynamodb

//configure the region, credentials...

//start a table process

//start an sns topic process

//IN the post route extract the form data in proper format into a variable

//the dynamodb client has a putItem method, the first argument is 
//an object that holds the table name to be written to the data being sent
//and form validation. the second argument is the callback function
//that sends back an error if necessary and publishs an sns message


