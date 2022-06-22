#include <stdlib.h>

#include "general/Position.h"
#include "general/Encoding.h"

#include "Textbox.h"

struct TextBox *NewTextBox(struct Position *p) {
    struct TextBox* tb = malloc(sizeof(struct TextBox));
    tb->pos = p;
    tb->len = 0;
    tb->txt = NULL;

    return tb;
}

struct Encoding *EncodeTextBox(struct TextBox* tb) {
    struct Encoding *pose = EncodePosition(tb->pos);
    struct Encoding *full = malloc(sizeof(struct Encoding));
    return full;
}