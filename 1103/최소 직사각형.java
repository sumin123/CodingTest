import java.util.*;

class Solution {
    public int solution(int[][] sizes) {
        int answer = 0;
        int max = 0;
        for (int i = 0; i < sizes.length; i++) {
            if (sizes[i][0] > max) {
                max = sizes[i][0];
            }
            if (sizes[i][1] > max) {
                max = sizes[i][1];
            }
        }
        
        int secondMax = 0;
        for (int i = 0; i < sizes.length; i++) {
            int tempMax = sizes[i][0] > sizes[i][1] ? sizes[i][1] : sizes[i][0];
            if (secondMax < tempMax) {
                secondMax = tempMax;
            }
        }
        answer = max * secondMax;
        return answer;
    }
}