#ifndef POSITION_H_
#define POSITION_H_

#ifdef __cplusplus
extern "C" {
#endif

#include "Encoding.h"

struct Position {
    double x, y;
};

struct Position *NewPosition(double, double);
struct Encoding *EncodePosition(struct Position*);

#ifdef __cplusplus
}
#endif

#endif