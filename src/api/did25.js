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
        this.publicKey = this._generateKeyPairFromSeed(seed);
        let seedPhrase = bip39.entropyToMnemonic(seed);
        return {seed: seedPhrase , pubKey: this.publicKey}
    }

    login(username, password){
        let seed = this._generateSeedFromCredentials(username + ' ' + password);
        let publicKey = this._generateKeyPairFromSeed(seed);
        console.log(publicKey);
        if(publicKey !== this.publicKey){
            return false;
        }
        return true;
    }

    resetCredentials(seed, username, password){
        let s = bip39.mnemonicToEntropy(seed);
        console.log("seed - " + s);
        let lostPubKey = this._generateKeyPairFromSeed(s);
        //if seed phrase doesn't match
        if(lostPubKey !== this.publicKey){
            return null;
        }
        //if seed phrase matches, signup again
        return this.signup(username, password);

    }

    _generateSeedFromCredentials(credentials){
        return bip39.mnemonicToSeed(credentials).slice(0, 32);
    }

    _generateKeyPair(credentials){
        let seed = this._generateSeedFromCredentials(credentials);
        console.log(seed);
        this.publicKey = this._generateKeyPairFromSeed(seed);
        console.log(this.publicKey)
        return this.publicKey;
    }

    _generateKeyPairFromSeed(seed) {
        const keyPair = seed ? nacl.sign.keyPair.fromSeed(seed) : nacl.sign.keyPair()
        return base58.encode(Buffer.from(keyPair.publicKey))
    }
}