var express = require('express');
var router = express.Router();
var client_helper=require('../helpers/client-heler')
var query_helper=require('../helpers/query-helper');
var invoke_helper=require('../helpers/invoke-helper');
require('dotenv').load();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bank' });
});

router.get('/:channelName/:chaincode/queryall',async function(req,res,next){
    let peeraddress=process.env.GDA_PEER_ADDRESS;
    let channel_name=req.params.channelName;
    let chaincode=req.params.chaincode;
    console.log("printing channel name"+channel_name)
   
    

    let client = await client_helper.getclient(peeraddress, channel_name, process.env.GDA_KEYSTORE_ADDRESS);
    let channel = await client.getChannel(channel_name);
    let peerevent = await client.peerevent;
    let message=await query_helper.query(channel,chaincode,"queryAllApprovals",[]);



    res.send(message);
})
router.get('/:channelName/:chaincode/query/:key',async function(req,res,next){
    let peeraddress=process.env.GDA_PEER_ADDRESS;
    let channel_name=req.params.channelName;
    let chaincode=req.params.chaincode;
    let key_name=req.params.key;
    console.log("printing channel name"+channel_name)
   
    

    let client = await client_helper.getclient(peeraddress, channel_name, process.env.GDA_KEYSTORE_ADDRESS);
    let channel = await client.getChannel(channel_name);
    let peerevent = await client.peerevent;
    let message=await query_helper.query(channel,chaincode,"queryApproval",[key_name]);





    
    res.send(message);
})
router.post('/:channelName/:chaincode/create/',async function(req,res,next){
    console.log("printing request body for create property route")
    console.log(req.body);
    let peeraddress=process.env.GDA_PEER_ADDRESS;
    let channel_name=req.params.channelName;
    let chaincode=req.params.chaincode;
    let key_name=req.body.PropertyID;
    let CurrentOwner=req.body.CurrentOwner;
    let ApprovalStatus=req.body.ApprovalStatus;
 
    
    console.log("printing channel name"+channel_name)
    

    let client = await client_helper.getclient(peeraddress, channel_name, process.env.GDA_KEYSTORE_ADDRESS);
    let channel = await client.getChannel(channel_name);
    let peerevent = await client.peerevent;
    let final_result =await  invoke_helper.invoke_transaction(client, channel, peerevent, chaincode, "v0", "createApproval", [key_name, CurrentOwner,ApprovalStatus], channel_name);
    
  




    
    res.send('{"result":"success"}');
})


module.exports = router;
