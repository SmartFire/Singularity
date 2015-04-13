package com.hubspot.singularity.runner.base.jackson;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.AnnotationIntrospector;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.introspect.Annotated;

public class ObfuscateAnnotationIntrospector extends AnnotationIntrospector {
  private static final ObfuscateSerializer OBFUSCATE_SERIALIZER = new ObfuscateSerializer();

  @Override
  public Version version() {
    return Version.unknownVersion();
  }

  @Override
  public Object findSerializer(Annotated am) {
    if (am.hasAnnotation(Obfuscate.class)) {
      return OBFUSCATE_SERIALIZER;
    } else {
      return null;
    }
  }

  public static class ObfuscateSerializer extends JsonSerializer<String> {
    public static String obfuscateValue(String value) {
      if (value == null) {
        return value;
      }

      if (value.length() > 4) {
        return String.format("***************%s", value.substring(value.length() - 4, value.length()));
      } else {
        return "(OMITTED)";
      }
    }

    @Override
    public void serialize(String value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {
      jgen.writeString(obfuscateValue(value));
    }
  }
}
