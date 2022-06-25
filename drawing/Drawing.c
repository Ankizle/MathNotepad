#include <stdlib.h>

#include "Drawing.h"

struct Drawing *NewDrawing(struct DrawNode* dn, int psize) {
    struct Drawing *d = malloc(sizeof(struct Drawing));
    d->start = dn;
    d->psize = psize;
    return d;
}

struct DrawNode *NewDrawNode(struct Position *p, struct DrawNode *next) {
    struct DrawNode *dn = malloc(sizeof(struct DrawNode));
    dn->pos = p;
    dn->next = next;
    return dn;
}

struct Drawing *EncodeDrawing(struct Drawing* d) {

}