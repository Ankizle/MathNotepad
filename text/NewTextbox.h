#ifndef NEWTEXTBOX_H_
#define NEWTEXTBOX_H_

#ifdef __cplusplus
extern "C" {
#endif

#include "general/Position.h"

struct TextBox {
    struct Position p;
    int len;
    int *txt;
};

#ifdef __cplusplus
}
#endif

#endif