#include <string.h>
#include <stdlib.h>
#include <ctype.h>

#include "Graph.h"

//lower precedence appears higher in the list
unsigned char* ops[] = {"=", "+-", "*/", "^"};

struct RelationNode *ParseRelationText(char* txt) {

    struct RelationNode *cur = malloc(sizeof(struct RelationNode));

    //loop through all the precedence levels
    for (int i = 0; i < (sizeof(ops) / sizeof(unsigned char*)); i++) {
        int j = 0;
        //loop through the text
        while (txt[j] != '\0') {
            char* o = &ops[i][0];

            //go through all the operators in the current precendence
            while (*o != '\0') {
                //if the current character is a match
                //split the string relative to the current position
                if (txt[j] == *o) {

                    //copy the left side
                    char *l = malloc(sizeof(char) * j + 1);
                    strncpy(l, txt, j);
                    l[j] = '\0';

                    //copy the right side
                    char *r = txt + j + 1;

                    cur->left = ParseRelationText(l);
                    cur->right = ParseRelationText(r);

                    cur->typ = *o;

                    //memory mngmt ;)
                    free(l);
                    return cur;
                }

                o++;
            }

            j++;
        }
    }

    //determine if it is a number or a variable

    if (isdigit(txt[0])) { 
        //the first digital is a number
        //if there is an alpha character here, after this point, its multiplication
        for (int i = 0; txt[i] != '\0'; i++) {
            if (!isdigit(txt[i]) && txt[i] != '.') {
                //multiplied by a variable

                char *l = malloc(sizeof(char) * i + 1);
                strncpy(l, txt, i);
                l[i] = '\0';
                char *r = txt + i;

                cur->left = ParseRelationText(l);
                cur->right = ParseRelationText(r);

                cur->typ = '*';

                free(l);
                return cur;
            }
        }
    }

    return cur;
}