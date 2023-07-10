export FABRIC_CFG_PATH=${PWD}/artifacts/channel/config/
export CHANNEL_NAME=mychannel
# ENV
. envVar.sh

CC_NAME="basic"
CHANNEL_NAME="mychannel"

chaincodeQuery(){
    setGlobalsForPeer0Org1
    
    peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function":"ReadAsset","Args":["3eb56q6o"]}'>&output.json
    
    cat output.json
}

chaincodeQuery

