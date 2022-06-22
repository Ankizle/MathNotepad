#ifndef POSITION_H_
#define POSITION_H_

#ifdef __cplusplus
extern "C" {
#endif

#include "Encoding.h"

struct Position {
    int x, y;
};

struct Position *NewPosition(int, int);
struct Encoding *EncodePosition(struct Position*);

#ifdef __cplusplus
}
#endif

#endif