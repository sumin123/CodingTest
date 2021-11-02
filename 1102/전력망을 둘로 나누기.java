import java.util.*;

class Solution {
    public int solution(int n, int[][] wires) {
        int answer = n+1;
        HashMap<Integer, List<Integer>> map = new HashMap<Integer, List<Integer>>();
        for(int i = 0; i < n; i++) {
            map.put(i+1, new ArrayList<Integer>());
        }

        for(int i = 0; i < wires.length; i++) {
            int num1 = wires[i][0];
            int num2 = wires[i][1];
            
            List<Integer> temp1 = map.get(num1);
            temp1.add(num2);
            
            List<Integer> temp2 = map.get(num2);
            temp2.add(num1);
        }
        
        for(int i = 0; i < wires.length; i++) {
            int[] wires_temp = new int[2];
            wires_temp[0] = wires[i][0];
            wires_temp[1] = wires[i][1];

            
            Queue<Integer> group1 = new LinkedList<>();
            group1.offer(1);
            int group_size = 1;
            boolean[] visited = new boolean[n];
            for (int j = 0; j < n; j++) {
                visited[j] = false;
            }
            visited[0] = true;
            while (group1.size() != 0) {
                int current = group1.poll();
                
                visited[current-1] = true;
                List<Integer> next_cand = map.get(current);
                for(int j = 0; j < next_cand.size(); j++) {
                    int next_idx = next_cand.get(j);
                    if (wires_temp[0] == current && wires_temp[1] == next_idx) continue;
                    else if (wires_temp[1] == current && wires_temp[0] == next_idx) continue;
                    else if (visited[next_idx-1] == false) {
                        group_size += 1;
                        group1.offer(next_idx);
                    }
                } 
            }
            int newAnswer = (Math.abs((n - group_size) - group_size));
            if (answer > newAnswer) answer = newAnswer;
        }
        
        return answer;
    }
}