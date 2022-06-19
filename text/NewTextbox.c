#include <stdlib.h>

#include "NewTextbox.h"

struct TextBox* NewTextBox() {
    struct TextBox* tb = malloc(sizeof(struct TextBox));
    tb->len = 0;
    tb->txt = NULL;

    return tb;
}