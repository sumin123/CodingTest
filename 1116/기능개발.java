import java.util.*;

class Solution {
    public int[] solution(int[] progresses, int[] speeds) {
        if (progresses.length == 0) return new int[0];
        ArrayList<Integer> answer = new ArrayList<Integer>();
        ArrayList<Integer> left = new ArrayList<Integer>();
        for(int i = 0; i < progresses.length; i++) {
            int share = (100 - progresses[i]) / speeds[i];
            int remainder = (100 - progresses[i]) % speeds[i];
            if (remainder > 0) left.add(share+1);
            else left.add(share);
        }
        int task = 1;
        int days = left.get(0);
        for(int i = 1; i < left.size(); i++) {
            if (left.get(i) <= days) {
                task += 1;
            }
            else {
                days = left.get(i);
                answer.add(task);
                task = 1;
            }
        }
        answer.add(task);
        int[] ans = new int[answer.size()];
        for(int i = 0; i < answer.size(); i++) {
            ans[i] = answer.get(i);
        }
        return ans;
    }
}