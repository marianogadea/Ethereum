var abi;
var myContractInstance;
var MyContract;
function startApp(abi2,MyContract2,myContractInstance2){
		console.error("startup");
	    abi=abi2;
	    MyContract=MyContract2;
	    myContractInstance=myContractInstance2;
}

function mintCoin(){ 
	var mintCoinAdd = document.getElementById('mintCoinAdd').value;
	var amount = document.getElementById('amount').value;
	var mintCoin = myContractInstance.mint(mintCoinAdd,amount,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});

}

function sendCoin(){

	var receiverAdd = document.getElementById('receiverAdd').value;
	var amountToSend = document.getElementById('amountToSend').value;
	var sendCoin = myContractInstance.send(receiverAdd,amountToSend,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
 var event = myContractInstance.Sent({},function(error, result) {
		  if (!error) {
			    var msg = result.args.from +" sent  " + result.args.amount + " coins to " + result.args.to;
			    document.getElementById('callback1').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
}

function checkBalance(){
	var checkBalAdd = document.getElementById('checkBalAdd').value;
	var sendCoin = myContractInstance.balances(checkBalAdd,function(err,res){
		if(err){
			console.log(err);
		} else {
			document.getElementById('balanceCallback').innerHTML = ""+res;
			console.log(res);
		}
	});
}


// Next step

var op = []
function handleAllMintCoinEvent(){
	var AddForFetchinEvents = document.getElementById('AddForFetchinEvents').value;
	
	//var allEvents = myContractInstance.CoinMinted({to:AddForFetchinEvents},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
	if(AddForFetchinEvents!=''){	
	console.log(AddForFetchinEvents);
	var allEvents = myContractInstance.CoinMinted({to:AddForFetchinEvents},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  var msg = result.args.to +" received " + (result.args.amount) + " fresh new coins " ;
				    document.getElementById('MintCoinEvents').innerHTML += "<hr/>"+msg;
//				    op.push(msg)
				    console.log(msg);
			  }
			  else {
				  console.error(error);
			  } 
		}); 
	} else {
		console.log("pulling all the events");
		var allEvents = myContractInstance.CoinMinted({},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  var msg = result.args.to +" received " + (result.args.amount) + " fresh new coins " ;
				    document.getElementById('MintCoinEvents').innerHTML += "<hr/>"+msg;
//				    op.push(msg)
				    console.log(msg);
			  }
			  else {
				  console.error(error);
			  } 
		}); 
	}
	allEvents.stopWatching();
	
}

//next step
function handleAllEvent(){
//	get the whole list of the events... 
	var allEvents = myContractInstance.allEvents({fromBlock: 0, toBlock: 'latest'},function(error, result) {
		  if (!error) {
			  var d = new Date(0);
			  d.setUTCSeconds(result.args._now); 
			    var msg = result.args._msg +" with Dr. " + (result.args._doctor) + " \n for patient " + result.args._patient +  
			    " in "+result.args._amount +"wei .  \n Its block no is " + result.blockNumber + " ." +
			    " \n The appointment id is \""+ (result.args._appointmentId)  +"\"  \n  at time = "+ 
			    (new Date(d));
			    document.getElementById('callback2').innerHTML += "<hr/>"+msg;
			    op.push(msg)
			    console.log(msg);
			    console.log(op);
		  }
		  else {
			  console.error(error);
		  } 
	}); 
	
	// would get all past logs again.
	
	allEvents.stopWatching();

	
}





function handleServiceProvidedEvent(){
	var patientId1 = document.getElementById('patientId_2').value;
	var docId1 = document.getElementById('docId_2').value;
	var allEvents = myContractInstance.ServiceProvided({_patient:patientId1, _doctor: docId1},{fromBlock: 0, toBlock: 'latest'},function(error, result) {
			  if (!error) {
				  var d = new Date(0);
				  d.setUTCSeconds(result.args._now); 
				    var msg = result.args._msg +" with Dr. " + (result.args._doctor) + " \n for patient " + result.args._patient +  
				    " in "+result.args._amount +"wei .  \n Its block no is " + result.blockNumber + " ." +
				    " \n The appointment id is \""+ (result.args._appointmentId)  +"\"  \n  at time = "+ 
				    (new Date(d));
				    document.getElementById('callback2').innerHTML += "<hr/>"+msg;
//				    op.push(msg)
				    console.log(msg);
			  }
			  else {
				  console.error(error);
			  } 
		}); 

// would get all past logs again.

		allEvents.stopWatching();
	
}
