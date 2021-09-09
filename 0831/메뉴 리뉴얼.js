class Q{
  constructor() {
      this.in_q = [];
      this.out_q = [];
  }
  en_q(i) {
      this.in_q.push(i);
  }
  de_q() {
      if (this.out_q.length === 0) {
          while(this.in_q.length !== 0){
              this.out_q.push(this.in_q.pop());
          }
      }
      return this.out_q.pop();
  }
  get length() {
      return this.in_q.length + this.out_q.length;
  }
}

function solution(orders, course) {
  let answer = [];
  let menus = [];
  orders.map(order => {
    menus.push([]);
    for(let i = 0; i < order.length; i++) {
        menus[menus.length-1].push(order[i]);
    }
  });
  menus = Array.from(menus);
  //console.log(menus)
  
  course.map(n => {
      let ans = new Set();
      let comb_cand = new Map();
      menus.map(order => {
        let res_arr = Combination(order, n);
        res_arr.map(el => {
          let key = el.sort().join('');
          comb_cand.set(key, el);
        });
      })
      comb_cand = Array.from(comb_cand.entries(), x=>x[1]);
      console.log(comb_cand)
      let max_order = 0;
      comb_cand.map(comb => {
          let cnt_order = 0;
          for(let i = 0; i < orders.length; i++){
              let order = orders[i];
              let include = true
              for(let j = 0; j < comb.length; j++) {
                  let char = comb[j];
                  if (order.includes(char) === false) {
                      include = false;
                      break;
                  }
              }
              if (include) {
                  cnt_order += 1;
              }
          }
          let ans_str = comb.sort().join('');
          if (cnt_order > 1 && max_order === cnt_order && ans.has(ans_str) === false) {
            ans.add(ans_str);
          }
          else if (cnt_order > 1 && max_order < cnt_order) {
            max_order = cnt_order;
            ans = new Set([ans_str]);
          }
      })
      ans.forEach(val => answer.push(val));
  })
  answer = answer.sort();
  console.log(answer)
  return answer;
}

function Combination(arr, n) {
  if (arr.length < n) return [];
  let q = new Q();
  let res = [];
  arr.map(el => q.en_q(new Set([el])));
  for(let i = 0; i < n-1; i++){
      let el_num = q.length;
      for(let j = 0; j < el_num; j++){
          let set_element = q.de_q();
          for(let k = 0; k < arr.length; k++){
              let temp = new Set([...set_element]);
              temp.add(arr[k]);
              if (temp.size === i + 2) {
                  q.en_q(temp);
              }
          }
      }
  };
  while(q.length !== 0) res.push([...q.de_q()])
  return res;
}

solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4])