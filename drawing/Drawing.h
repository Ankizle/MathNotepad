#ifndef DRAWING_H_
#define DRAWING_H_

#ifdef __cplusplus
extern "C" {
#endif

#include "general/Position.h"

struct Drawing {
    struct Position* posl; //list of positions recorded
    char psize; //pen size
};

#ifdef __cplusplus
}
#endif

#endif