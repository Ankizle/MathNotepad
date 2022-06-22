#ifndef TEXTBOX_H_
#define TEXTBOX_H_

#ifdef __cplusplus
extern "C" {
#endif

#include "general/Position.h"
#include "general/Encoding.h"

struct TextBox {
    struct Position pos;
    int len;
    int *txt;
};

struct TextBox *NewTextBox(struct Position);
struct Encoding *EncodeTextBox(struct TextBox*);

#ifdef __cplusplus
}
#endif

#endif