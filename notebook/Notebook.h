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

struct Notebook {
    FILE* file;

    struct TextBox **texts;
    unsigned int textl;

    struct Drawing **drawings;
    unsigned int drawingsl;

    struct RelationNode **graphs;
    unsigned int graphsl;
};

struct Notebook *NewNotebook(char*);
struct Notebook *OpenNotebook(char*);
void CloseNotebook(struct Notebook*);
struct Encoding *EncodeNotebook(struct Notebook*);

#ifdef __cplusplus
}
#endif

#endif