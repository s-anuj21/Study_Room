/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* deleteDuplicates(ListNode *root) {
    ListNode *i, *j, *parent;
    parent = NULL;
    i = root;
    j = root->next;

    while(j != NULL) {
        if(i->val != j->val) {

            if(i->val != i->next->val)
                parent = i;
            else
                if(parent)
                    parent->next = j;
                else
                    root = j;

            i = j;
        }

        j = j->next;

    }
    i->next = NULL;
    return root;
}

};
