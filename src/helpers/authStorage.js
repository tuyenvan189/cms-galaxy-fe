class AuthStorage {
    // set Storage
    setStorage (value, key = 'accessToken') {
        window.localStorage.setItem(key,value);
    }

    // get storage
    getStorage = (key = 'accessToken') => window.localStorage.getItem(key);

    // check storage
    isAuthenticated = () => !!this.getStorage();
    // isAuthenticated = () => this.getStorage(); // string

    isValidToken = value => {
        if (!value) return false;

        const expireTime =12312323 // BE response
        const currentTime = Date.now() / 1000;
        return expireTime < currentTime;       
    }
    // clear storage
    clearStorage() {
        window.localStorage.clear()
    }
}

const authStorage = new AuthStorage();

export default authStorage;