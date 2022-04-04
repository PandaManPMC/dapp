const sigUtil = require('eth-sig-util');
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
const ethUtil = web3.utils;
var connAccount;

$('#btn1').click(eth_requestAccounts);
$('#btn2').click(eth_sign);
$(function(){
    eth_requestAccounts();
});

function eth_requestAccounts(){
    ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
        connAccount = accounts[0];
    }).catch((error) => {
        if (error.code === 4001) {
            alert('请连接 MetaMask');
        } else {
            console.error(error);
        }
    });
}

ethereum.on('accountsChanged', accounts => {
    connAccount = accounts[0];
});

async function eth_sign(){
    const msgParams = {
      domain: {
        chainId: 4,  // 定义链编号，Rinkeby 测试网络是4
        name: 'Example', // 合约名称
        verifyingContract: '0x445e9AbA3ABDa19e76d9aC0A77C63F5d24941501', // 合约地址
        version: '1', // 最新版本
      },
      message: { // 消息签名的数据内容
        contents: '签名测试',
        from: {
          name: '大白',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
          ],
        },
        to: [
          {
            name: '小黑',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
            ],
          },
        ],
      },
      primaryType: 'Mail', // 指定引用的下方的键值对对象
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    };
    try {
      const from = connAccount;
      const sign = await ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [from, JSON.stringify(msgParams)],
      });
      console.log('签名');
      console.log(sign);
      signTypedDataV4Verify(sign,msgParams);
    } catch (err) {
        console.log('出现错误');
        console.error(err);
    }
  }


function signTypedDataV4Verify(sign,msgParams){
    try {
        const from = connAccount;
        const recoveredAddr = sigUtil.recoverTypedSignature_v4({
          data: msgParams,
          sig: sign,
        });
        if (ethUtil.toChecksumAddress(recoveredAddr) === ethUtil.toChecksumAddress(from)) {
            console.log('验证通过');
        } else {
            console.log('签名错误');
        }
      } catch (err) {
        console.error(err);
      }
}




