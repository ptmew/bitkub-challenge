const axios = require('axios');

async function request(method, url, data) {
    const headers={}
    headers['Content-Type'] = 'application/json'
    try {
      // call api
      const response = await axios({
        method,
        url,
        headers,
        data: JSON.stringify(data)
      })
      return response.data
    } catch (e) {
      return e
    }
  }

const API_KEY='S7KAD8X788IWIBB1MN9ZH4Z4Q4BXVQUTDA';
const ADDRESS= '0xEcA19B1a87442b0c25801B809bf567A6ca87B1da';
const addresses = new Set();
addresses.add("0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a");
addresses.add("0x63a9975ba31b0b9626b34300f7f627147df1f526");

const getBalance = async(addresses)=>{
    URL=`https://api-ropsten.etherscan.io/api?module=account&action=balancemulti&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67&tag=latest&apikey=${API_KEY}`

}

const getData = async(address)=>{
    await new Promise(resolve => setTimeout(resolve, 10));
    URL= `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${address}&endblock=999999999&sort=asc&apikey=${API_KEY}`
    const transactionData = await request('get',URL,{});
    const body = transactionData.result
    let bktcTransaction = []
    if(body.length != 0){
        for(let transaction of body){
            if(transaction['tokenSymbol'] == 'BKTC'){
                const newAddress = transaction['to']
                if(!addresses.has(newAddress)){
                    addresses.add(newAddress)
                }
                let obj = {
                    "hash":transaction['hash'],
                    "from":transaction['from'],
                    "to":transaction['to'],
                    "Amount": transaction['value']
                }
                bktcTransaction.push(obj)
                console.log(bktcTransaction)
                //console.log(addresses)
                const newAddressTransaction = await getData(newAddress)
                bktcTransaction = bktcTransaction.concat(newAddressTransaction)
            }
    
        }
    }

    return bktcTransaction
} 

const printData = async(address)=>{
    const test = await getData(address)
    console.log(test)
}


const run = printData(ADDRESS)