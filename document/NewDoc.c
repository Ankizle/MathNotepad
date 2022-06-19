#include <stdio.h>
#include "NewDoc.h"

/*
    in:
        filename: name of the file to create the document in (including directory)

    out:
        file pointer to newly created document
*/
FILE* NewDocument(char* filename) {
    FILE* f = fopen(filename, "w+");

    fprintf(f, "MNB.");

    return f;
}