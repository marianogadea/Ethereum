var abi;
var myContractInstance;
var MyContract;
function startApp(abi2,MyContract2,myContractInstance2){
		console.error("startup");
	    abi=abi2;
	    MyContract=MyContract2;
	    myContractInstance=myContractInstance2;
}

function createProperty(){ 
	var propAddressNew = document.getElementById('propAddressNew').value;
	var propDescription = document.getElementById('propDescription').value;
	var propValue = document.getElementById('propValue').value;
	var propOwner = document.getElementById('propOwner').value;
	var createProperty = myContractInstance.createProperty(propAddressNew,propDescription,propValue,propOwner,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});

}

function transferProperty(){

	var newOwner = document.getElementById('receiverAdd').value;
	var propAddress = document.getElementById('propertyToTransfer').value;
	var transferProperty = myContractInstance.transferProperty(newOwner,propAddress,function(err,res){
		if(err){
			console.log(err);
		} else {
			console.log(res);
		}
	});
 var event = myContractInstance.Transfer({},function(error, result) {
		  if (!error) {
			    var msg = result.args.street +" transferred from: " + result.args.from + " to: "+ result.args.to;
			    document.getElementById('callback1').innerHTML = ""+msg;
			    console.log(msg);

		  }
		  else {
			  console.error(error);
		  } 
	});
}

function checkProperty(){
	var checkProp = document.getElementById('checkProp').value;
	var propertyStatus = myContractInstance.properties(checkProp,function(err,res){
		if(err){
			console.log(err);
		} else {
			document.getElementById('propertyCallback').innerHTML = ""+res;
			console.log(res);
			
		}
	});
}

