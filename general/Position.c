#include <stdlib.h>

#include "Position.h"

struct Position NewPosition(int x, int y) {
    struct Position p;
    p.x = x;
    p.y = y;
    return p;
}

struct Encoding EncodePosition(struct Position p) {
    unsigned char* c = malloc(2 * sizeof(unsigned char));
    struct Encoding e;
    return e;
}