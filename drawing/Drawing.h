#ifndef DRAWING_H_
#define DRAWING_H_

#ifdef __cplusplus
extern "C" {
#endif

#include "general/Position.h"

struct DrawNode {
    struct Position* pos;
    struct DrawNode* next;
}

struct Drawing {
    struct DrawNode* start;
    char psize; //pen size
};

struct Drawing *NewDrawing();
struct Drawing *EncodeDrawing(struct Drawing*);

#ifdef __cplusplus
}
#endif

#endif