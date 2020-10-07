const cookie = {
    set: function(key, value, day) {
        let d = new Date();
        d.setDate(d.getDate() + day);
        document.cookie = `${key}=${value};expires=${d};path=/`;
    },
    get: function(key) {
        if (document.cookie) {
            let arr = document.cookie.split('; ');
            for (let i in arr) {
                let item = arr[i].split('=');
                if (item[0] === key) return item[1];
            }
        }
    },
    remove: function(key) {
        this.set(key, "", -1);
        // document.cookie = `${key}="";expires=-1;path=/`;
    }
}