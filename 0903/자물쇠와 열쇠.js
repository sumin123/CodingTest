let key_n;
let lock_n;

function solution(key, lock) {
    key_n = key.length;
    lock_n = lock.length;
    
    for (let col_start = 0; col_start < key_n + lock_n - 1; col_start++)
        for (let row_start = 0; row_start < key_n + lock_n - 1; row_start++){
            for (let rot = 0; rot < 4; rot++){
                let keyAdd = make_new();
                key = rotate(key);
                
                for (let i_key = 0; i_key < key_n; i_key++){
                    for (let j_key = 0; j_key < key_n; j_key++){
                        keyAdd[row_start+i_key][col_start+j_key] = key[i_key][j_key];
                    }
                }

                let isMatch = true;
                for (let i_key = 0; i_key < lock_n; i_key++){
                    for (let j_key = 0; j_key < lock_n; j_key++){
                        if (keyAdd[i_key+key_n-1][j_key+key_n-1]+lock[i_key][j_key]!==1){
                            isMatch = false;
                            break;
                        }
                    }
                    if (!isMatch) break;
                }
                if (isMatch === true) return true;
            }
        }
    return false;
}
    
function make_new() {
    let newArr = [];
    for(let i = 0; i < 2 * key_n + lock_n - 2; i++){
        let row = [];
        for (let j = 0; j < 2 * key_n + lock_n - 2; j++) {
            row.push(0);
        }
        newArr.push(row);
    }
    return newArr;
}

function rotate(arr) {
    let result = [];
    for (let i = 0; i<arr.length; i++){
        let row = [];
        for (let j = 0; j<arr.length; j++){
            row.push(0);
        }
        result.push(row);
    }
    
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr.length; j++){
            result[j][arr.length - 1 - i] = arr[i][j];
        }
    }
    return result;
}