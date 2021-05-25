// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:

// Input: strs = [""]
// Output: [[""]]
// Example 3:

// Input: strs = ["a"]
// Output: [["a"]]
 

// Constraints:

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] consists of lower-case English letters.


//store sorted input in an array of arrays 'grouped'-> [[anagrams set 1], [anagrams set 2], ..., [anagrams set n]]
//iterate through input array 'ungrouped'
    //for each string, iterate through 'grouped', checking if it matches any anagram groups
            //handle edge case of length 0 here
            //check if lengths match. if so, check if same chars appear in same frequency
                //convert two strings to object
                //go through char by char, adding each as a key w/ value 1 if not present, else incrementing value
        //if it's a match, add it to that anagram sub-array and increment 'ungrouped'
        //if not, add a new anagram sub-array to 'grouped' containing that item and increment 'ungrouped'
//return 'grouped'
var groupAnagrams = (ungrouped) => {
    let grouped = [];
    for(let i = 0; i < ungrouped.length; i++){
        let matchFound = false;
        if(ungrouped[i].length === 0){
            for(let j = 0; j < grouped.length; j++){
                if(grouped[j][0].length === 0){
                    grouped[j].push("");
                    matchFound = true;
                    break;
                }
            }
        } else {
            let ungroupItem = {};
            let curr = ungrouped[i];
            for(let j = 0; j < ungrouped[i].length; j++){ //translate item to add to object of chars
                if(!ungroupItem[curr[j]]){
                    ungroupItem[curr[j]] = 1;
                } else {
                    ungroupItem[curr[j]] = ungroupItem[curr[j]] + 1;
                }
            }
            for(let j = 0; j < grouped.length; j++){ //iterate all anagram groups checking for match
                if(grouped[j][0].length === curr.length){ //filters out diff-sized anagram groups, to skip unnecessary processes
                    let compare = grouped[j][0];
                    let groupItem = {};
                    for(let k = 0; k < compare.length; k++){ //translate 1st item of curr anagram grouping to object of chars
                        //for the sake of optimization, in particular for large datasets, it would be better to keep an array of object-translated strings and add new anagram groups to them at the time of adding to 'grouped', rather than making redundant translations with every incrementation
                        if(!groupItem[compare[k]]){
                            groupItem[compare[k]] = 1;
                        } else {
                            groupItem[compare[k]] = groupItem[compare[k]] + 1;
                        }
                    }
                    let equal = true;
                    for(var key in groupItem){ //ensure all chars in curr anagram group exist in new item in same quantities
                        if(groupItem[key] !== ungroupItem[key]){
                            equal = false;
                            break;
                        }
                    }
                    if(equal){
                        matchFound = true;
                        grouped[j].push(curr);
                        break;
                    }
                }
            }
        }
        if(!matchFound){
            grouped.push([ungrouped[i]]);
        }
    }
    return grouped;
}