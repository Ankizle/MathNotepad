#ifndef GRAPH_H_
#define GRAPH_H_

#ifdef __cplusplus
extern "C" {
#endif

struct RelationNode {
    char typ; //type of node
    struct RelationNode *left, *right; //left and right nodes

    double valn; //value of the node (for numbers)
    char* valv; //value of node (for variables)
};

struct RelationNode *ParseRelationText(char*);

#ifdef __cplusplus
}
#endif

#endif