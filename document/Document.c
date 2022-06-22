#include <stdio.h>
#include <stdlib.h>

#include "Document.h"
#include "general/Encoding.h"

struct Document *NewDocument(char* filename) {
    struct Document *d = malloc(sizeof(struct Document));

    FILE* f = fopen(filename, "w+");

    fprintf(f, "MNB");

    d->file = f;

    return d;
}

struct Document* OpenDocument(char* filename) {
    struct Document *d = malloc(sizeof(struct Document));

    FILE* f = fopen(filename, "r+");
    d->file = f;

    //TODO

    return d;
}

struct Encoding *EncodeDocument(struct Document *d) {
    struct Encoding *e = malloc(sizeof(struct Encoding));
    return e;
}