#include <stdlib.h>

#include "Position.h"

struct Position *NewPosition(int x, int y) {
    struct Position *p = malloc(sizeof(struct Position));
    p->x = x;
    p->y = y;
    return p;
}

struct Encoding *EncodePosition(struct Position *p) {
    struct Encoding *e = malloc(sizeof(struct Encoding));
    return e;
}