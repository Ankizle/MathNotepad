#ifndef DOCUMENT_H_
#define DOCUMENT_H_

#ifdef __cplusplus
extern "C" {
#endif

#include <stdio.h>

#include "text/Textbox.h"
#include "drawing/Drawing.h"
#include "graphing/Graph.h"
#include "general/Encoding.h"

struct Document {
    FILE* file;

    struct TextBox **texts;
    unsigned int textl;

    struct Drawing **drawings;
    unsigned int drawingsl;

    struct RelationNode **graphs;
    unsigned int graphsl;
};

struct Document *NewDocument(char*);
struct Document *OpenDocument(char*);
void CloseDocument(struct Document*);
struct Encoding *EncodeDocument(struct Document*);

#ifdef __cplusplus
}
#endif

#endif