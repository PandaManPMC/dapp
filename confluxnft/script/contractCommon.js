var mySymbol = 'CFXNFT';

// test
// const confluxrpcUrl = 'https://portal-test.confluxrpc.com';
// const contractAddress = 'cfxtest:achnssh9rwhx5ycccbu3vrsnrehw3rrr1ar763513f';
// const chainId = '0x1';
// const contractOwner = 'cfxtest:aakn1vwze9142dfh3hsvt4xz350xw6gfkyup2w603k';
//  const mynetworkId = 1;

// prod
const confluxrpcUrl = 'https://portal-main.confluxrpc.com';
const contractAddress = 'cfx:acgy248usza4u1v97nbjms9fstmt1684ujngxf7p7h';
const chainId = '0x405';
const contractOwner = 'cfx:aap424phn3cyay5nat5kbrjwf2aau7w7bpv1hfb6m1';
const mynetworkId = 1029;

var myContract;
var myWeb3;
var myFormat;
var myDrip;


// init contract object
function initMyContract(callback){
    $.getJSON('./data/abi.json', function(res){
        console.log(res);
        let jsonInterface = res;
        myFormat = window.TreeGraph.format;
        myDrip = window.TreeGraph.Drip;
        myWeb3 = new window.TreeGraph.Conflux({
            url: confluxrpcUrl,
            networkId: mynetworkId,
            logger: console,
        });
        myWeb3.provider = conflux;
        myContract = myWeb3.Contract({abi:jsonInterface,address:contractAddress});
        if (callback){
            callback();
        }
    })
}

function getQueryVariable (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
 }

function getIPFSData(ipfsuri){
    let l = ipfsuri.split('//');
    if (2 == l.length){
        return 'https://ipfs.io/ipfs/' + l[1];
    }
    return 'https://ipfs.io/ipfs/' + ipfsuri;
}
