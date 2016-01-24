export default class TempMap {
    constructor(expireTime) {
        // Throw error if not expireTime is not number
        if (typeof expireTime !== 'number') {
            throw new TypeError('Invalid value used as expire time');
        }

        this._expireTime = expireTime;
        this._entries = [];
    }

    get(key) {
        let item;

        for (let i = 0, l = this._entries.length; i < l; i++) {
            item = this._entries[i];

            if (item[0] === key) {
                return item[1];
            }
        }
    }

    set(key, value) {
        let item, timeout;

        timeout = setTimeout(() => this.delete(key), this._expireTime);

        for (let i = 0, l = this._entries.length; i < l; i++) {
            item = this._entries[i];

            if (item[0] === key) {
                if (item[2]) {
                    clearTimeout(item[2]);
                }

                item[1] = value;
                item[2] = timeout;

                return this;
            }
        }

        this._entries.push([ key, value, timeout ]);
    }

    has(key) {
        let item;

        for (let i = 0, l = this._entries.length; i < l; i++) {
            item = this._entries[i];

            if (item[0] === key) {
                return true;
            }
        }

        return false;
    }

    delete(key) {
        let item;

        for (let i = 0, l = this._entries.length; i < l; i++) {
            item = this._entries[i];

            if (item[0] === key) {
                this._entries.splice(i, 1);

                return true;
            }
        }

        return false;
    }
}
