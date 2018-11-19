import bip39 from 'bip39';
import base58 from 'bs58';
import nacl from 'tweetnacl';

export default class Did25 {
    constructor(){
        this.publicKey = null;
        this.privateKey = null;
    }
    
    updatePublicKey(pubKey){
        this.publicKey = pubKey;
    }
    
    signup(username, password){
        let seed = this._generateSeedFromCredentials(username + ' ' + password);
        let mnemonic = bip39.entropyToMnemonic(seed);
        const { pubKey, privKey } = this._generateKeyPairFromSeed(seed);
        this.publicKey = pubKey;
        this.privateKey = privKey;
        
        return {passphrase: mnemonic , pubKey: this.publicKey}
    }

    login(username, password){
        let seed = this._generateSeedFromCredentials(username + ' ' + password);
        let publicKey = this._generateKeyPairFromSeed(seed).pubKey;
        if(publicKey !== this.publicKey){
            return false;
        }
        return true;
    }

    recoverCredentials(passphrase){
        let s = bip39.mnemonicToEntropy(passphrase);
        console.log(s);
        let lostPubKey = this._generateKeyPairFromSeed(s).pubKey;
        //if seed phrase doesn't match
        if(lostPubKey !== this.publicKey){
            return null;
        }
        //if seed phrase matches, signup again
        return {
            
        };

    }

    _generateSeedFromCredentials(credentials){
        return bip39.mnemonicToSeed(credentials).slice(0, 32);
    }

    _generateKeyPairFromSeed(seed) {
        const keyPair = seed ? nacl.sign.keyPair.fromSeed(seed) : nacl.sign.keyPair()
        return {
            pubKey: base58.encode(Buffer.from(keyPair.publicKey)),
            privKey: base58.encode(Buffer.from(keyPair.privateKey))
        }
    }
}