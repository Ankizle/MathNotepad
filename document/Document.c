#include <stdio.h>

#include "Document.h"
#include "general/Encoding.h"

struct Document NewDocument(char* filename) {
    struct Document d;

    FILE* f = fopen(filename, "w+");

    fprintf(f, "MNB.");

    d.file = f;

    return d;
}

struct Encoding EncodeDocument(struct Document d) {
    struct Encoding e;
    return e;
}